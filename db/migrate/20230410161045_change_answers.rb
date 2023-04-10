class ChangeAnswers < ActiveRecord::Migration[7.0]
  def change
    rename_column :answers, :answer_author_id, :author_id
  end
end
