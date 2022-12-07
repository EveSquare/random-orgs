import { render, screen } from 'utils/test-utils'

import OrganizationCard from '.'

describe('<OrganizationCard />', () => {
  it('should render the heading', () => {
    render(<OrganizationCard />)

    expect(screen.getByRole('heading', { name: /OrganizationCard/i })).toBeInTheDocument()
  })
})
