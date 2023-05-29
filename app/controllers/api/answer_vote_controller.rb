class Api::AnswerVoteController < ApplicationController
    def show
        @answer_vote = answer_vote.find_by()
    end
    
    def index
        @answer_votes = AnswerVote.all
    end

    def create

    end

    def update

    end

    def destroy

    end

end
