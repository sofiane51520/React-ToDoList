import './Card.scss'

const Card = ({title, description,img}) => {
    return (
        <div className={'cardContainer'}>
            <div className={'header'}>
                <img src={img}/>
            </div>
            <div className={'desc'}>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Card;