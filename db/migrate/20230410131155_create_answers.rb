class CreateAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :answers do |t|
      t.references :answer_author, null: false, foreign_key: {to_table: :users}, index: true
      t.references :question, null: false, foreign_key: true, index: true
      t.text :body, null: false
      t.timestamps
    end
  end
end
