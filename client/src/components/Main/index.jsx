import { useEffect,useState } from "react";
import styles from "./styles.module.css";

const Main = () => {
	const [user,setUser] = useState(JSON.parse(localStorage.getItem("userDetails")))
	const handleLogout = () => {
		localStorage.removeItem("token")
		window.location.reload();
	};


	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Homepage</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
            {console.log(user)}
			<div className="userDetails" style={{'border':'2px solid black','borderRadius':'2%','padding':'5px','margin-top':'50px','width':'50%'}} >
				<h3 style={{'padding-left':'10%','color':'red'}}>User details</h3> 
                <p style={{'padding-left':'10%'}}><b>First name:{user.firstName}</b></p><br />
                <p style={{'padding-left':'10%'}}><b>Last name:{user.lastName}</b></p><br />
				<p style={{'padding-left':'10%'}}><b>Email : {user.email}</b></p>
			</div>
		</div>
	);
};

export default Main;
