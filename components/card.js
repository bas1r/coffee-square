import Link from "next/link";
import Image from "next/image";

const Card = (props) => {
  return (
    <Link href={props.href}>
      <div className="card bg-dark text-white">
        <Image
          src={props.storePhoto}
          width={400}
          height={200}
          priority={true}
          style={{ objectFit: "cover", width: "100%", height: "auto" }}
          className="card-img opacity-50"
          alt="..."
        ></Image>
        <div className="card-img-overlay">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.location.address}</p>
          {/* <p className="card-text"><small>Distance {props.distance}</small></p> */}
        </div>
      </div>
    </Link>
  );
};

export default Card;
