import { Story, Meta } from '@storybook/react/types-6-0'

import OrganizationCard from '.'

export default {
  title: 'OrganizationCard',
  component: OrganizationCard
} as Meta

export const Default: Story = () => <OrganizationCard />
