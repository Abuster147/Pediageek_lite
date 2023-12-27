import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import NotFound from "../global/NotFound";
import SingleFollower from "./SingleFollower";

const UserInfo = () => {
    const { auth, darkMode } = useSelector((state: RootStore) => state);
    const { isdarkMode } = darkMode;
    if (!auth.user) return <NotFound />;
    if (auth.user.follower.length === 0)
        return <h3 className={`text-center text-${isdarkMode ? 'white' : 'black'}`}>No Followers</h3>;
  
        return (
            <div>
                {auth.user?.follower.map((follow) => (
                    <>
                        <SingleFollower key={follow} id={follow} />
                    
                    </>
                ))
                }
            </div >
        );
   

};
export default UserInfo;
