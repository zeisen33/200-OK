class Api::AnswerVotesController < ApplicationController
    wrap_parameters include: AnswerVote.attribute_names + ['voterId', 'votedAnswerId']
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
        @answer_vote = AnswerVote.new(answer_vote_params)
        @current_user = current_user
        @answer = @answer_vote.answer
        if @answer_vote.save
            render :show
        else
            errors = @answer_vote.errors.full_messages
            if errors == ['Voter You have already voted on this answer']
                new_AV = @answer.votes.select{|vote| vote.voter_id == @current_user.id }
                debugger
                redirect_to action: 'destroy', id: new_AV[0].id
            else
                render json: { errors: errors }
            end
        end
    end

    def update
        @answer_vote = AnswerVote.find_by(id: params[:id])
        @answer = @answer_vote.answer
        @current_user = current_user
        if @answer_vote.voter.id == @current_user.id
            if @answer_vote.update(answer_vote_params)
                render :show
            else
                render json: { errors: @answer_vote.errors.full_messages }
            end
        end
    end

    def destroy
        debugger
        @answer_vote = AnswerVote.find_by(id: params[:id])

        @current_user = current_user
        if @answer_vote.voter.id == @current_user.id
            @answer_vote.destroy
            puts 'destroyed'
        else  
            puts 'users dont match'
        end
    end

    private
    def answer_vote_params
        params.require(:answer_vote).permit(:voter_id, :voted_answer_id, :direction)
    end
end
