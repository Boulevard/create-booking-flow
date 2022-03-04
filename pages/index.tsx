import type { NextPage } from 'next'
import { Container } from 'components/Container'
import { BlockContainer } from 'components/blocks/BlockContainer'

const HomePage: NextPage = () => {
    return (
        <Container>
            <BlockContainer />
        </Container>
    )
}

export default HomePage
