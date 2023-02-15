class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.references :asker, null: false, foreign_key: {to_table: :users}
      t.string :title, null: false
      t.text :body
      t.timestamps
    end
  end
end
