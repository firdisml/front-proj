import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('./chart/LineCharts'),
  { ssr: false }
)

export default function ResponsiveCharts() {
  return (
    <div>
      <DynamicComponentWithNoSSR />
      </div>

  )
}