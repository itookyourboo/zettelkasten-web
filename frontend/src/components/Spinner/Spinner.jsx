import {Spinner as BSpinner} from 'solid-bootstrap'

function Spinner({...rest}) {
    return (
        <BSpinner animation="grow" variant="primary" {...rest}/>
    )
}

export default Spinner;
