
import { useContext} from 'react'
import "../styles/Profile.css"

import profileInfoContext from '../context/profileInfo';
import LogOutButton from './profile/LogOutButton';
import EditProfileButton from './profile/EditProfileButton';
import NutrientsForms from './profile/NutrientsForms';
import ProfilePicture from './profile/ProfilePicture';

export default function Profile() {

    const {profileInfo}=useContext(profileInfoContext);


    return (
        <div id="profile">
            
            { profileInfo && <div>
                
                <ProfilePicture />
                
                <h1>{profileInfo.username}</h1>

                <LogOutButton />
                <EditProfileButton />

                <hr style={{margin:"50px 0"}} />   

                <NutrientsForms />

                
                </div>}


            </div>
            
    )
}

