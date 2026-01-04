import { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  CogIcon,
  DocumentIcon,
  StarIcon,
  BookIcon,
  CaseIcon,
  HeartIcon,
  EditIcon,
  MobileDeviceIcon,
  SparklesIcon,
} from '@sanity/icons'

// Custom desk structure for better content organization
export const structure = (S: StructureBuilder, context: StructureResolverContext) =>
  S.list()
    .title('Contenu')
    .items([
      // Pages Section
      S.listItem()
        .title('Pages du site')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              // Homepage
              S.listItem()
                .title('Accueil')
                .icon(HomeIcon)
                .child(
                  S.list()
                    .title('Contenu Accueil')
                    .items([
                      S.listItem()
                        .title('Section Hero')
                        .icon(SparklesIcon)
                        .child(
                          S.documentList()
                            .title('Hero Accueil')
                            .filter('_type == "heroSection" && page == "home"')
                        ),
                      S.listItem()
                        .title('Sections de la page')
                        .icon(DocumentTextIcon)
                        .child(
                          S.document()
                            .schemaType('homepageContent')
                            .documentId('homepageContent')
                            .title('Contenu de la page')
                        ),
                      S.listItem()
                        .title('Témoignages vedettes')
                        .icon(StarIcon)
                        .child(
                          S.documentList()
                            .title('Témoignages vedettes')
                            .filter('_type == "testimonial" && featured == true')
                        ),
                    ])
                ),

              // Yoga & Programmes
              S.listItem()
                .title('Yoga & Programmes')
                .icon(HeartIcon)
                .child(
                  S.list()
                    .title('Contenu Yoga')
                    .items([
                      S.listItem()
                        .title('Section Hero')
                        .icon(SparklesIcon)
                        .child(
                          S.documentList()
                            .title('Hero Yoga')
                            .filter('_type == "heroSection" && page == "programmes"')
                        ),
                      S.listItem()
                        .title('Cours réguliers')
                        .icon(BookIcon)
                        .child(
                          S.documentList()
                            .title('Cours')
                            .filter('_type == "programme" && type == "class"')
                        ),
                      S.listItem()
                        .title('Retraites')
                        .icon(StarIcon)
                        .child(
                          S.documentList()
                            .title('Retraites')
                            .filter('_type == "programme" && type == "retreat"')
                        ),
                      S.listItem()
                        .title('Ateliers')
                        .icon(EditIcon)
                        .child(
                          S.documentList()
                            .title('Ateliers')
                            .filter('_type == "programme" && type == "workshop"')
                        ),
                      S.listItem()
                        .title('Formations')
                        .icon(BookIcon)
                        .child(
                          S.documentList()
                            .title('Formations')
                            .filter('_type == "programme" && type == "training"')
                        ),
                    ])
                ),

              // Coaching
              S.listItem()
                .title('Coaching')
                .icon(UsersIcon)
                .child(
                  S.list()
                    .title('Contenu Coaching')
                    .items([
                      S.listItem()
                        .title('Section Hero')
                        .icon(SparklesIcon)
                        .child(
                          S.documentList()
                            .title('Hero Coaching')
                            .filter('_type == "heroSection" && page == "coaching"')
                        ),
                      S.listItem()
                        .title('Témoignages Coaching')
                        .icon(StarIcon)
                        .child(
                          S.documentList()
                            .title('Témoignages')
                            .filter('_type == "testimonial" && serviceType == "coaching"')
                        ),
                    ])
                ),

              // Organisations
              S.listItem()
                .title('Organisations')
                .icon(CaseIcon)
                .child(
                  S.list()
                    .title('Contenu Organisations')
                    .items([
                      S.listItem()
                        .title('Section Hero')
                        .icon(SparklesIcon)
                        .child(
                          S.documentList()
                            .title('Hero Organisations')
                            .filter('_type == "heroSection" && page == "organisations"')
                        ),
                      S.listItem()
                        .title('Témoignages Corporate')
                        .icon(StarIcon)
                        .child(
                          S.documentList()
                            .title('Témoignages')
                            .filter('_type == "testimonial" && serviceType == "corporate"')
                        ),
                    ])
                ),

              // Ressources / Blog
              S.listItem()
                .title('Ressources & Blog')
                .icon(BookIcon)
                .child(
                  S.list()
                    .title('Contenu Ressources')
                    .items([
                      S.listItem()
                        .title('Section Hero')
                        .icon(SparklesIcon)
                        .child(
                          S.documentList()
                            .title('Hero Ressources')
                            .filter('_type == "heroSection" && page == "ressources"')
                        ),
                      S.listItem()
                        .title('Articles de blog')
                        .icon(DocumentTextIcon)
                        .child(S.documentTypeList('article').title('Articles')),
                    ])
                ),

              // Contact
              S.listItem()
                .title('Contact')
                .icon(MobileDeviceIcon)
                .child(
                  S.documentList()
                    .title('Hero Contact')
                    .filter('_type == "heroSection" && page == "contact"')
                ),

              // Expertise
              S.listItem()
                .title('Expertise')
                .icon(StarIcon)
                .child(
                  S.documentList()
                    .title('Hero Expertise')
                    .filter('_type == "heroSection" && page == "expertise"')
                ),
            ])
        ),

      S.divider(),

      // Quick Access - All content by type
      S.listItem()
        .title('Tous les programmes')
        .icon(BookIcon)
        .child(S.documentTypeList('programme').title('Programmes')),

      S.listItem()
        .title('Tous les témoignages')
        .icon(StarIcon)
        .child(S.documentTypeList('testimonial').title('Témoignages')),

      S.listItem()
        .title('Tous les articles')
        .icon(DocumentTextIcon)
        .child(S.documentTypeList('article').title('Articles')),

      S.listItem()
        .title('Toutes les sections Hero')
        .icon(SparklesIcon)
        .child(S.documentTypeList('heroSection').title('Sections Hero')),

      S.divider(),

      // Settings
      S.listItem()
        .title('Instructeur')
        .icon(UsersIcon)
        .child(S.documentTypeList('instructor').title('Instructeur')),

      S.listItem()
        .title('Paramètres du site')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Paramètres')
        ),
    ])
