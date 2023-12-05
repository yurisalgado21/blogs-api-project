const BlogPostModel = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
          },
          title: {
            type: DataTypes.STRING,
          },
          content: {
            type: DataTypes.STRING,
          },
          userId: {
            type: DataTypes.INTEGER,
            foreignKey: true
          },
          published: {
            type: DataTypes.DATE,
          },
          updated: {
            type: DataTypes.DATE,
          }
    },{
        tableName: 'blog_posts',
        timestamps: false,
        underscored: true,
    })

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'users'
        })
    }

    return BlogPost;
}

module.exports = BlogPostModel;