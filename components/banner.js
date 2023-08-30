const Banner = (props) => {
    return <span>
    <h1>Discover your local coffee shops.</h1>
    <p className="fs-5 col-md-8">Production-ready files with this barebones example featuring some basic HTML and helpful links.</p>

    <div className="mb-5">
      <button type="button" onClick={props.handleOnClick} className="btn btn-dark rounded-pill">
        {props.buttonText}
      </button>
    </div>

  </span>
}

export default Banner;