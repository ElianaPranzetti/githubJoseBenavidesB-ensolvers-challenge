import './tag.css'


export const Tag = ({tag, idx}) => {
  return (
    <p key={idx}><i className="fa-solid fa-tag"></i>{tag} <span><i className="fa-solid fa-xmark"></i></span></p>
  )
}
