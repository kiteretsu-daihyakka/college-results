import {Helmet} from 'react-helmet'

const Title = (props) => {
    return <Helmet>
        <title>{props.children} | Just College</title>
    </Helmet>
}
export default Title
