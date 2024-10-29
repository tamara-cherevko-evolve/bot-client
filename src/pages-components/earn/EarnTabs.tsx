import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface EarnTabsProps {
  tabs: {
    name: string
    title: string
    content: React.ReactNode
  }[]
}

const EarnTabs = ({ tabs }: EarnTabsProps) => {
  return (
    <Tabs defaultValue={tabs[0].name} className="w-full">
      <TabsList>
        {tabs.map(({ name, title }) => (
          <TabsTrigger value={name} key={name}>
            {title}
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
