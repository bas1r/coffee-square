export function getStaticProps(staticProps) {
    console.log("params: ", staticProps)
    return {
        props: { param: "2"}
    }
}

export function getStaticPaths() {
    return {
        paths: [{params: {slug: "test"}}],
        fallback: false
    }
}
const Test = () => {
    return "Foo Bar"
}

export default Test