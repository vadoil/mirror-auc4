#!/usr/bin/env python3
"""Recheck recent successful payments via the verified webhook. Dry run unless --apply."""
import argparse
import base64
import datetime as dt
import json
import os
import urllib.parse
import urllib.request


def request(url, headers, body=None):
    req = urllib.request.Request(url, headers=headers, data=None if body is None else json.dumps(body).encode())
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.load(response)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--apply', action='store_true')
    parser.add_argument('--hours', type=int, default=48)
    args = parser.parse_args()
    if not 1 <= args.hours <= 24 * 365:
        parser.error('--hours must be between 1 and 8760')
    shop = os.environ['YOOKASSA_SHOP_ID']
    key = os.environ['YOOKASSA_SECRET_KEY']
    webhook = os.environ['YOOKASSA_WEBHOOK_URL']
    if not webhook.startswith('https://'):
        raise ValueError('YOOKASSA_WEBHOOK_URL must use HTTPS')
    auth = base64.b64encode(f'{shop}:{key}'.encode()).decode()
    params = {'status': 'succeeded', 'limit': 100, 'created_at.gte': (dt.datetime.now(dt.timezone.utc) - dt.timedelta(hours=args.hours)).isoformat()}
    found = replayed = 0
    while True:
        page = request('https://api.yookassa.ru/v3/payments?' + urllib.parse.urlencode(params), {'Authorization': 'Basic ' + auth})
        for payment in page.get('items', []):
            if payment.get('test') or not payment.get('paid') or payment.get('amount', {}).get('currency') != 'RUB':
                continue
            if not payment.get('metadata', {}).get('wellness_registration_id'):
                continue
            found += 1
            if args.apply:
                result = request(webhook, {'Content-Type': 'application/json'}, {'event': 'payment.succeeded', 'object': {'id': payment['id']}})
                if not result.get('ok'):
                    raise RuntimeError('Webhook did not acknowledge reconciliation')
                replayed += 1
        if not page.get('next_cursor'):
            break
        params['cursor'] = page['next_cursor']
    print(json.dumps({'successful_wellness_payments': found, 'replayed': replayed, 'dry_run': not args.apply}))


if __name__ == '__main__':
    main()
