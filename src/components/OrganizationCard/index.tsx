import { Card, Image, Heading, Link, Stack, CardFooter, CardBody, Text, Button } from '@chakra-ui/react'
import { Props } from './type';

const OrganizationCard = ({ organization }: Props) => (
  <>
    <Link href={`https://github.com/${organization.login}`}>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src={organization.avatar_url}
          alt={organization.login}
        />

        <Stack>
          <CardBody>
            <Heading size='md'>{organization.login}</Heading>
            <Text py='2'>
              {organization.description}
            </Text>
          </CardBody>

          <CardFooter>
            <Button variant='solid' colorScheme='blue'>
              Github
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </Link>
  </>
)

export default OrganizationCard
