const ZettelItem = ({json, depth}) => {
    return (
        <li style={{
            "margin-left": `${depth}em`
        }}>{json.title}</li>
    )
}

export default ZettelItem;