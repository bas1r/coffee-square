import Link from "next/link";
import Image from "next/image";

const Card = (props) => {
    return <Link href={props.href}>

      <div className="card text-bg-dark text-white">
        {/* <img src="..." class="card-img" alt="..."></img> */}
        <img src={props.storePhoto} className="card-img" alt="..."></img>
        <div className="card-img-overlay">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.location.address}</p>
          <p className="card-text"><small>Last updated 3 mins ago</small></p>
        </div>
      </div>

{/* 
    <div className="card h-100">
      <img src="https://source.unsplash.com/random/900×1200/?coffee" className="img-fluid rounded-start" alt="..."></img>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.location.address}</p>
      </div>
      </div> */}

     {/* <div className="card h-100" role="button">
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.location.address}.</p>
        </div>
      </div>  */}
    </Link>
}

export default Card;