import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    featuredCardContainer: {
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
        height: "490px",
        textDecoration: "none",
        marginTop: "100px",
        [theme.breakpoints.down("sm")]: {
          marginTop: "50px",
        }
    },
    card: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
    },
    cardRoot: {
        position: "relative",
        height: "100%",
        width: "100%",
    },
    cardMedia: {
        position: "absolute",
        //top: 0,
        //right: 0,
        borderRadius: "20px",
        marginLeft: "20px",
        margin: "0 auto",
        height: "62%",
        width: "80%",
        objectFit: "cover",
        backgroundColor: "rgba(0, 0, 0, 0.575)",
        backgroundBlendMode: "darken",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "10px",
        }
    },
    cardContent: {
        color: "#fff",
        width: "40%",
        marginLeft: "20px",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            marginBottom: "100px",
        }
    },
    cardContentRoot: {
        position: "relative",
        backgroundColor: "transparent",
    }
}))