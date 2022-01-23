import {Spinner as BSpinner} from 'solid-bootstrap'

function Spinner({...rest}) {
    return (
        <BSpinner animation="border" {...rest}/>
    )
}

export default Spinner;
