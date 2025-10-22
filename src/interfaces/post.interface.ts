export interface Post {
  id: string;
  userProfileId: string;
  imageUrl: string;
  caption: string;
  createdAt: Date;
  likes: string[];
}

export interface PostRequest {
  userProfileId: string;
  imageUrl: string;
  caption: string;
}

export interface UpdatePostRequest {
  id: string;
  userProfileId: string;
  imageUrl?: string;
  caption?: string;
}

export interface DeletePostRequest {
  id: string;
}

export interface LikePostRequest {
  userProfileId: string;
  postId: string;
}