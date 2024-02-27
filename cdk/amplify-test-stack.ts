import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

export class AmplifyTestStack extends cdk.Stack {

  constructor(scope: cdk.App, id: string, props: cdk.StackProps) {
    super(scope, id, props);

/*
	REWRITE					Rewrite (200).
	PERMANENT_REDIRECT	Permanent redirect (301).
	TEMPORARY_REDIRECT	Temporary redirect (302).
	NOT_FOUND				Not found (404).
	NOT_FOUND_REWRITE		Not found rewrite (404).
*/

    const test_paths = [
      { source: '/<*>',                                target: '/index.html',                                                                         status: amplify.RedirectStatus.NOT_FOUND_REWRITE },
      { source: '/api/<*>',                            target: 'https://test-alb.alliancegenome.org/api/<*>',                                         status: amplify.RedirectStatus.REWRITE },

      { source: '/jbrowse/worms/protein',              target: 'https://test.alliancegenome.org/jbrowse/worms/protein/',                              status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/jbrowse/worms/protein/',             target: 'https://main.djgvd7iswt7yy.amplifyapp.com/',                                          status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/protein/<*>',          target: 'https://main.djgvd7iswt7yy.amplifyapp.com/<*>',                                       status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/jbrowse-simple',       target: 'https://test.alliancegenome.org/jbrowse/worms/jbrowse-simple/',                       status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/jbrowse/worms/jbrowse-simple/',      target: 'https://main.d341oo3yism9gt.amplifyapp.com/jbrowse-simple/',                          status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/jbrowse-simple/<*>',   target: 'https://main.d341oo3yism9gt.amplifyapp.com/jbrowse-simple/<*>',                       status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/jbrowse',              target: 'https://test.alliancegenome.org/jbrowse/worms/jbrowse/',                              status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/jbrowse/worms/jbrowse/',             target: 'https://main.d341oo3yism9gt.amplifyapp.com/jbrowse/',                                 status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/jbrowse/<*>',          target: 'https://main.d341oo3yism9gt.amplifyapp.com/jbrowse/<*>',                              status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/jbrowse2',             target: 'https://test.alliancegenome.org/jbrowse/worms/jbrowse2/',                             status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/jbrowse/worms/jbrowse2/',            target: 'https://main.d2jjb0xowet5mr.amplifyapp.com/',                                         status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/worms/jbrowse2/<*>',         target: 'https://main.d2jjb0xowet5mr.amplifyapp.com/<*>',                                      status: amplify.RedirectStatus.REWRITE },

      { source: '/jbrowse/<*>',                        target: 'https://test-alb.alliancegenome.org/jbrowse/<*>',                                     status: amplify.RedirectStatus.REWRITE },
      { source: '/apollo/<*>',                         target: 'https://test-alb.alliancegenome.org/apollo/<*>',                                      status: amplify.RedirectStatus.REWRITE },
      { source: '/agr_simplemine.cgi',                 target: 'https://caltech-curation.textpressolab.com/pub/cgi-bin/forms/agr_simplemine.cgi',     status: amplify.RedirectStatus.REWRITE },
      { source: '/alliancemine/cdn/<*>',               target: 'https://test-alb.alliancegenome.org/alliancemine/cdn/<*>',                            status: amplify.RedirectStatus.REWRITE },
      { source: '/alliancemine/',                      target: 'https://test-alb.alliancegenome.org/alliancemine/',                                   status: amplify.RedirectStatus.REWRITE },
      { source: '/alliancemine/<*>',                   target: 'https://test-alb.alliancegenome.org/alliancemine/<*>',                                status: amplify.RedirectStatus.REWRITE },
      { source: '/bluegenes',                          target: 'https://test-alb.alliancegenome.org/bluegenes/alliancemine',                          status: amplify.RedirectStatus.REWRITE },
      { source: '/bluegenes/',                         target: 'https://test-alb.alliancegenome.org/bluegenes/alliancemine',                          status: amplify.RedirectStatus.REWRITE },
      { source: '/bluegenes/<*>',                      target: 'https://test-alb.alliancegenome.org/bluegenes/<*>',                                   status: amplify.RedirectStatus.REWRITE },
      { source: '/swagger-ui',                         target: 'https://test-alb.alliancegenome.org/swagger-ui',                                      status: amplify.RedirectStatus.REWRITE },
      { source: '/swagger-ui/',                        target: 'https://test-alb.alliancegenome.org/swagger-ui/',                                     status: amplify.RedirectStatus.REWRITE },
      { source: '/swagger-ui/<*>',                     target: 'https://test-alb.alliancegenome.org/swagger-ui/<*>',                                  status: amplify.RedirectStatus.REWRITE },
      { source: '/openapi',                            target: 'https://test-alb.alliancegenome.org/openapi',                                         status: amplify.RedirectStatus.REWRITE },
      { source: '</^[^.]+$/>',                         target: '/index.html',                                                                         status: amplify.RedirectStatus.REWRITE }
    ];

    const amplifyApp = new amplify.App(this, 'agr-ui-test', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'alliance-genome',
        repository: 'agr_ui',
        oauthToken: cdk.SecretValue.secretsManager('GithubOauthDevopsToken'),
      }),
      autoBranchCreation: {
        patterns: ['KANBAN-*'],
      },
      autoBranchDeletion: true,
      role: iam.Role.fromRoleArn(this, "AmplifyALBRole", 'arn:aws:iam::100225593120:role/StageAmplifyRole'),
    });

    const test = amplifyApp.addBranch('test', { autoBuild: true, branchName: 'test', stage: 'PRODUCTION' });

    const domain = amplifyApp.addDomain('alliancegenome.org', {
      enableAutoSubdomain: true, // in case subdomains should be auto registered for branches
      autoSubdomainCreationPatterns: ['kanban-*'], // regex for branches that should auto register subdomains
    });

    //domain.mapRoot(test);
    domain.mapSubDomain(test, 'test');

    for(let path of test_paths) {
      amplifyApp.addCustomRule({
        source: path.source,
        target: path.target,
        status: path.status
      });
    }

  }
}