const ZettelViewer = ({zettel, ...rest}) => {
    return (
        <div {...rest}>
            <h3> {zettel().title} </h3>
            <span> {zettel().content} </span>
        </div>
    )
}

export default ZettelViewer;