import HashLoader from "react-spinners/HashLoader";

export const Loader = ({ loading }) => {
    return (
        <>
            {loading && <div style={{ width: '100%', overflow: 'hidden', height: '100vh', display: 'flex', alignItem: 'center', justifyContent: 'center', background: '#00000099', position: 'fixed', left: '0px', top: '0px', zIndex: 9999999999999999999 }}>
                <HashLoader size={80} color="#ffffff" style={{ justifyContent: 'center', alignItems: "center" }} />
            </div>}

        </>
    )

}