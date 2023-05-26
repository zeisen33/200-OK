class CreateAnswerVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :answer_votes do |t|
      t.references :voter, null: false, foreign_key: {to_table: :users} 
      t.references :voted_answer, null: false, foreign_key: {to_table: :answers}
      t.boolean :direction, null: false
      t.timestamps
    end
  end
end
