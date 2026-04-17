import ServiceDetailLayout from '@/components/sections/ServiceDetailLayout'
import { services } from '@/lib/data/services'

export default function EmployeeVerificationPage() {
  const service = services.find((item) => item.id === 'employee-verification')
  if (!service) return null

  const related = services.filter((item) => service.related.includes(item.id))

  return <ServiceDetailLayout service={service} relatedServices={related} />
}
