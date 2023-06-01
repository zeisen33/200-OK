class Api::AnswerVotesController < ApplicationController
    wrap_parameters include: AnswerVote.attribute_names + ['voterId, votedAnswerId, direction']
    before_action :require_logged_in, only: [:create, :update, :destroy]
    
    def show
        @answer_vote = AnswerVote.find_by(id: params[:id])
        render :show
    end
    
    def index
        @answer_votes = AnswerVote.all.includes(:voter_id, :voted_answer_id)
        render :index
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
        @answer_vote = AnswerVote.find_by(id: params[:id])
        @current_user = current_user
        if @answer_vote.voter.id == @current_user.id
            if @answer_vote.update(answer_params)
                render :show
            else
                render json: { errors: @answer_vote.errors.full_messages }
            end
        end
    end

    def destroy
        @answer_vote = AnswerVote.find_by(id: params[:id])
        @current_user = current_user
        if @answer_vote.voter.id == @current_user.id
            @answer_vote.destroy
        end
    end

    private
    def answer_vote_params
        params.require(:answer_vote).permit(:voter_id, :voted_answer_id, :direction)
    end

end
