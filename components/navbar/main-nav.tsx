'use client'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Settings, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Route {
  id: string
  name: string
  link: string
}

const MainNav = ({ data }: { data: Route[] }) => {
  const pathname = usePathname()

  const routes = data.map((route) => ({
    href: `/${route.id}`,
    label: route.name,
    active: pathname === `/${route.id}`,
  }))

  return (
    <nav className='mx-6 flex items-center gap-6'>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-primary-foreground' : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
      <Separator orientation='vertical' className='h-8' />
      <div className='flex gap-6'>
        <Link href={'#'} className='px-0'>
          <Settings
            className='text-muted-foreground hover:text-primary'
            size={20}
          />
        </Link>
        <Link href={'#'} className='px-0'>
          <User
            className='text-muted-foreground hover:text-primary'
            size={20}
          />
        </Link>
      </div>
    </nav>
  )
}

export default MainNav
