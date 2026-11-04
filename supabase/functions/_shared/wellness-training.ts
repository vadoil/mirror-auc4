export type TrainingPlace = { training: string; status: 'confirmed' | 'waitlisted'; queue_position: number | null }
export async function getTrainingPlaces(supabase: { from: (table: string) => { select: (columns: string) => { eq: (column: string, value: string) => PromiseLike<{ data: unknown; error: { code: string } | null }> } } }, registrationId: string): Promise<TrainingPlace[]> {
  const { data, error } = await supabase.from('wellness_training_places')
    .select('training, status, queue_position').eq('registration_id', registrationId)
  if (error) throw new Error(`training places: ${error.code}`)
  return (data ?? []) as TrainingPlace[]
}
export function trainingStatusLabel(place?: TrainingPlace): string {
  if (!place) return 'статус уточняется'
  return place.status === 'waitlisted' ? `в очереди · №${place.queue_position}` : 'место подтверждено'
}
