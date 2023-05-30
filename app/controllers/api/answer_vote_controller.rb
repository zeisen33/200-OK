class Api::AnswerVoteController < ApplicationController
    wrap_parameters include: AnswerVote.attribute_names + ['voterId, votedAnswerId, direction']
    
    def show
        @answer_vote = AnswerVote.find_by(id: params[:id])
        render :show
    end
    
    def index
        @answer_votes = AnswerVote.all
    end

    def create
        @answer_vote = Answer.new(answer_params)
        if @answer_vote.save
            render :show
        else
            render json: { errors: @answer.errors.full_messages }
        end
    end

    def update

    end

    def destroy

    end

    private
    def answer_vote_params
        params.require(:answer_vote).permit(:voter_id, :voted_answer_id, :direction)
    end

end