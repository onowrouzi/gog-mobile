export class GameReview {
    id: number;
    title: string;
    teaser: string;
    description: string;
    author: {
      name: string;
      avatarPath: string;
      id: string;
    };
    helpfulVotes: number;
    totalVotes: number;
    rating: number;
    added: number;
    edited: number;
}
