class CreatePages < ActiveRecord::Migration[6.0]
  def change
    create_table :pages do |t|
      t.string :author
      t.string :content
      t.integer :book_id

      t.timestamps
    end
  end
end
