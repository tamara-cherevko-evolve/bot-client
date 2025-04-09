import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CoinIcon } from 'shared-components'

interface EarnTabsProps {
  tabs: {
    name: string
    title: string
    content: React.ReactNode
  }[]
  defaultTab: string
}

const EarnTabs = ({ tabs, defaultTab }: EarnTabsProps) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList>
        {tabs.map(({ name, title }) => (
          <TabsTrigger value={name} key={name} className="text-white">
            <CoinIcon coin={name} className="w-5 mr-2" /> {title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ name, content }) => (
        <TabsContent value={name} key={name} className="py-4">
          {content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default EarnTabs
