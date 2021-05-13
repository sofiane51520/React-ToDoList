import './Card.scss'

const Card = ({title, description,img}) => {
    return (
        <div className={'cardContainer'}>
            <div className={'header'}>
                <img src={img} alt={'listPic'}/>
            </div>
            <div className={'desc'}>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Card;