import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as cdk from 'aws-cdk-lib';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';

export class AmplifyStageStack extends cdk.Stack {

  constructor(scope: cdk.App, id: string, props: cdk.StackProps) {
    super(scope, id, props);

/*
	REWRITE					Rewrite (200).
	PERMANENT_REDIRECT	Permanent redirect (301).
	TEMPORARY_REDIRECT	Temporary redirect (302).
	NOT_FOUND				Not found (404).
	NOT_FOUND_REWRITE		Not found rewrite (404).
*/

    const stage_paths = [
      { source: '/api/<*>',                            target: 'https://stage-api.alliancegenome.org/api/<*>',                                        status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/protein',              target: 'https://stage.alliancegenome.org/jbrowse/worms/protein/',                             status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/jbrowse/worms/protein/',             target: 'https://staging.djgvd7iswt7yy.amplifyapp.com/',                                       status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/protein/<*>',          target: 'https://staging.djgvd7iswt7yy.amplifyapp.com/<*>',                                    status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/jbrowse-simple',       target: 'https://stage.alliancegenome.org/jbrowse/worms/jbrowse-simple/',                      status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/jbrowse/worms/jbrowse-simple/',      target: 'https://staging.d341oo3yism9gt.amplifyapp.com/jbrowse-simple/',                       status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/jbrowse-simple/<*>',   target: 'https://staging.d341oo3yism9gt.amplifyapp.com/jbrowse-simple/<*>',                    status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/jbrowse',              target: 'https://stage.alliancegenome.org/jbrowse/worms/jbrowse/',                             status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/jbrowse/worms/jbrowse/',             target: 'https://staging.d341oo3yism9gt.amplifyapp.com/jbrowse/',                              status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/jbrowse/<*>',          target: 'https://staging.d341oo3yism9gt.amplifyapp.com/jbrowse/<*>',                           status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/jbrowse2',             target: 'https://stage.alliancegenome.org/jbrowse/worms/jbrowse2/',                            status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/jbrowse/worms/jbrowse2/',            target: 'https://staging.d2jjb0xowet5mr.amplifyapp.com/',                                      status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/jbrowse2/<*>',         target: 'https://staging.d2jjb0xowet5mr.amplifyapp.com/<*>',                                   status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse',                            target: 'https://stage-jbrowse.alliancegenome.org/jbrowse/',                                   status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/<*>',                        target: 'https://stage-jbrowse.alliancegenome.org/jbrowse/<*>',                                status: amplify.RedirectStatus.REWRITE },
      { source: '/apollo',                             target: 'https://stage-apollo.alliancegenome.org/apollo/',                                     status: amplify.RedirectStatus.REWRITE },
      { source: '/apollo/<*>',                         target: 'https://stage-apollo.alliancegenome.org/apollo/<*>',                                  status: amplify.RedirectStatus.REWRITE },
      { source: '/agr_simplemine.cgi',                 target: 'https://caltech-curation.textpressolab.com/pub/cgi-bin/forms/agr_simplemine.cgi',     status: amplify.RedirectStatus.REWRITE },
      { source: '/swagger-ui',                         target: 'https://stage-api.alliancegenome.org/swagger-ui',                                     status: amplify.RedirectStatus.REWRITE },
      { source: '/swagger-ui/',                        target: 'https://stage-api.alliancegenome.org/swagger-ui/',                                    status: amplify.RedirectStatus.REWRITE },
      { source: '/swagger-ui/<*>',                     target: 'https://stage-api.alliancegenome.org/swagger-ui/<*>',                                 status: amplify.RedirectStatus.REWRITE },
      { source: '/openapi',                            target: 'https://stage-api.alliancegenome.org/openapi',                                        status: amplify.RedirectStatus.REWRITE },
      { source: '/textpresso/sgd',                     target: 'https://stage.alliancegenome.org/textpresso/sgd/tpc',                                 status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/textpresso/sgd/',                    target: 'https://stage.alliancegenome.org/textpresso/sgd/tpc',                                 status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/textpresso/sgd/<*>',                 target: 'https://sgd-textpresso.alliancegenome.org/<*>',                                       status: amplify.RedirectStatus.REWRITE },
      { source: '/textpresso/wb',                      target: 'https://stage.alliancegenome.org/textpresso/wb/tpc',                                  status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/textpresso/wb/',                     target: 'https://stage.alliancegenome.org/textpresso/wb/tpc',                                  status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/textpresso/wb/<*>',                  target: 'https://wb-textpresso.alliancegenome.org/<*>',                                        status: amplify.RedirectStatus.REWRITE },
      { source: '/<*>',                                target: '/index.html',                                                                         status: amplify.RedirectStatus.NOT_FOUND_REWRITE },
      { source: '</^[^.]+$|\.(?!(css|xml|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>', target: '/index.html',                status: amplify.RedirectStatus.REWRITE }
    ];

    const amplifyApp = new amplify.App(this, 'agr-ui-stage', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'alliance-genome',
        repository: 'agr_ui',
        oauthToken: cdk.SecretValue.secretsManager('GithubOauthDevopsToken'),
      }),
      autoBranchCreation: {
        patterns: ['SCRUM-*', 'KANBAN-*'],
      },
      autoBranchDeletion: true,
    });

    //const main = amplifyApp.addBranch('main', { autoBuild: true, branchName: 'main', stage: 'PRODUCTION' });
    //const test = amplifyApp.addBranch('test', { autoBuild: true, branchName: 'test', stage: 'BETA' });
    const stage = amplifyApp.addBranch('stage', { autoBuild: true, branchName: 'stage', stage: 'PRODUCTION' });

    const domain = amplifyApp.addDomain('alliancegenome.org', {
      enableAutoSubdomain: true, // in case subdomains should be auto registered for branches
      autoSubdomainCreationPatterns: ['scrum-*', 'kanban-*'], // regex for branches that should auto register subdomains
    });

    //domain.mapRoot(stage);
    domain.mapSubDomain(stage, 'stage');

    for(let path of stage_paths) {
      amplifyApp.addCustomRule({
        source: path.source,
        target: path.target,
        status: path.status
      });
    }

  }
}
