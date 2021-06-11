import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { PHOTO_FRAGMENT } from "../fragments";

const SEE_PROFILE_QUERY = gql`
    query seeProfile($username: String!) {
        seeProfile(username: $username) {
            firstName
            lastName
            username
            bio
            avatar
            photos {
                ...PhotoFragment
            }
            totalFollowing
            totalFollowers
            isMe
            isFollowing
        }
    }
    ${PHOTO_FRAGMENT}
`;

function Profile() {
    const { username } = useParams();
    const { data } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
            username,
        },
    });
    console.log(data)
    return ("profile");
}

export default Profile;