const KastenItem = ({json, depth}) => {
    return (
        <li style={{
            "margin-left": `${depth}em`
        }}>{json.title}</li>
    )
}

export default KastenItem;