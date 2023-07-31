import Container from '@/components/ui/container'
import Link from 'next/link'
import MainNav from '@/components/navbar/main-nav'

const routes = [
  {
    id: 'train',
    name: 'Train',
    link: 'train',
  },
  {
    id: 'programs',
    name: 'Programs',
    link: 'programs',
  },
  {
    id: 'goals',
    name: 'Goals',
    link: 'goals',
  },
  {
    id: 'progress',
    name: 'Progress',
    link: 'progress',
  },
]

const Navbar = () => {
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">Trainify</p>
          </Link>
          <div className="ml-auto">
            <MainNav data={routes} />
          </div>
          {/* <NavbarActions /> */}
        </div>
      </Container>
    </div>
  )
}

export default Navbar
