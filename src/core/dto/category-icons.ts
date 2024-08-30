import Category from './category.enum';

const categoryIcons: Record<Category, string> = {
    [Category.Agile]: ":running:",
    [Category.Architecture]: ":triangular_ruler:",
    [Category.Design]: ":art:",
    [Category.DevOps]: ":gear:",
    [Category.Embedded]: ":electric_plug:",
    [Category.Mobile]: ":iphone:",
    [Category.Testing]: ":test_tube:",

    // Languages
    [Category.Java]: ":coffee:",
    [Category.JavaScript]: ":memo:",
    [Category.DotNet]: ":blue_book:",
  
    // Technologies
    [Category.AI]: ":robot_face:",
    [Category.Database]: ":floppy_disk:",
    [Category.Cloud]: ":cloud:",
  
    // Default
    [Category.Unknown]: ":question:"
};

export default categoryIcons;
