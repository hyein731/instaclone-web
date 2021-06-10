import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart, faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";
import { FatText } from "../shared";

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!) {
        toggleLike(id: $id) {
            ok
            error
        }
    }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 615px;
`;
const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;
const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

function Photo({ id, user, file, isLiked, likes }) {
    const updateToggleLike = (cache, result) => {
        const { data: { toggleLike: { ok } } } = result;
        if (ok) {
            const fragmentId = `Photo:${id}`;
            const fragment = gql`
                fragment BSName on Photo {
                    isLiked
                    likes
                }
            `;

            // witeFragment => cache에서 특정 object의 일부분 수정
            cache.writeFragment({
                id: fragmentId,
                fragment,
                data: {
                    isLiked: !isLiked,
                    likes: isLiked? likes - 1 : likes + 1,
                },
            });

            // Photo prop에 isLiked, likes 값이 없다면? 아래처럼 캐시에서 읽어올 수 있음
            /*const res = cache.readFragment({
                id: fragmentId,
                fragment
            })
            if ("isLiked" in res && "likes" in res) {
                const { isLiked: cacheIsLiked, likes: cacheLikes } = res;
                cache.writeFragment({
                    id: fragmentId,
                    fragment,
                    data: {
                        isLiked: !cacheIsLiked,
                        likes: cacheIsLiked? cacheLikes - 1 : cacheLikes + 1,
                    },
                });
            }*/
        }
    };
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: { id },
        // refetchQueries: [{ query: FEED_QUERY }] // Like 하나 업뎃하고 가져오기엔 너무 무거움
        update: updateToggleLike,
    });

    return (
        <PhotoContainer key={id}>
                    <PhotoHeader>
                        <Avatar lg url={user.avatar} />
                        <Username>{user.username}</Username>
                    </PhotoHeader>
                    <PhotoFile src={file} />
                    <PhotoData>
                        <PhotoActions>
                            <div>
                                <PhotoAction onClick={toggleLikeMutation}>
                                    <FontAwesomeIcon 
                                        style={{ color: isLiked ? "tomato" : "inherit" }}
                                        icon={isLiked ? SolidHeart : faHeart}
                                    />
                                </PhotoAction>
                                <PhotoAction>
                                    <FontAwesomeIcon icon={faComment} />
                                </PhotoAction>
                                <PhotoAction>
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </PhotoAction>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faBookmark} />
                            </div>
                        </PhotoActions>
                        <Likes>{likes === 1? "1 like" : `${likes} likes`}</Likes>
                    </PhotoData>
                </PhotoContainer>
    );
}

Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
    }),
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
};

export default Photo;