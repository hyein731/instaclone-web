import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../../apollo";

const ME_QUERY = gql`
    query me {
        me {
            username
            avatar
        }
    }
`;

function useUser( ) {
    const hasToken = useReactiveVar(isLoggedInVar);
    const { data } = useQuery(ME_QUERY, {
        skip: !hasToken,
    });
    useEffect(() => {
        if (data?.me === null) { // token이 있지만 Backend에서 유효한 token이 아닐 경우
            logUserOut();
        }
    }, [data])
    return;
}

export default useUser;