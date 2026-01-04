import { getProgrammes } from '@/lib/sanity'
import ProgrammesContent from './ProgrammesContent'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function ProgrammesPage() {
  // Fetch all programmes from Sanity
  const programmes = await getProgrammes()

  // Separate classes from retreats/workshops/training
  const classes = programmes.filter((p) => p.type === 'class')
  const retreatsAndWorkshops = programmes.filter((p) => p.type !== 'class')

  return (
    <ProgrammesContent
      classes={classes}
      retreatsAndWorkshops={retreatsAndWorkshops}
    />
  )
}
