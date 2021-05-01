import './Card.scss'

const Card = ({title}) => {
    return (
        <div className={'cardContainer'}>
            <div className={'header'}/>
            <div className={'desc'}>
                <h4>{title}</h4>
                <p>Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Corporis cupiditate dolores eligendi
                    laborum molestiae necessitatibus officia? A architecto
                    consequuntur eaque harum, inventore ipsam maiores quae
                    sint totam vel voluptas voluptatem!2</p>
            </div>
        </div>
    )
}

export default Card;