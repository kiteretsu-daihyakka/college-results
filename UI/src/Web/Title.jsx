import {Helmet} from 'react-helmet'

const Title = (props) => {
    return <Helmet>
        <title>{props.children}</title>
    </Helmet>
}
export default Title