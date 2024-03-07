import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

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
      { source: '/jbrowse2',                           target: 'https://stage.alliancegenome.org/jbrowse2/',                                          status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/jbrowse2/',                          target: 'https://stage.dgaayxgqoarxf.amplifyapp.com/',                                         status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse2/<*>',                       target: 'https://stage.dgaayxgqoarxf.amplifyapp.com/<*>',                                      status: amplify.RedirectStatus.REWRITE }, 
      { source: '/jbrowsedata/XenBaseXTJBrowse/<*>',   target: 'https://jbrowse.xenbase.org/XenJBrowse/data/xt9_1/<*>',                               status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowsedata/XenBaseXLJBrowse/<*>',   target: 'https://jbrowse.xenbase.org/XenJBrowse/data/xl9_2/<*>',                               status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowsedata/XenBaseData/<*>',        target: 'https://jbrowse.xenbase.org/XenJBrowse/<*>',                                          status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowsedata/RGDJBrowse/<*>',         target: 'https://rgd.mcw.edu/jbrowse2/<*>',                                                    status: amplify.RedirectStatus.REWRITE },
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
      { source: '/alliancemine',                       target: 'https://stage.alliancegenome.org/alliancemine/',                                      status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/alliancemine/',                      target: 'https://stage-alliancemine.alliancegenome.org/alliancemine/',                     status: amplify.RedirectStatus.REWRITE },
      { source: '/alliancemine/<*>',                   target: 'https://stage-alliancemine.alliancegenome.org/alliancemine/<*>',                  status: amplify.RedirectStatus.REWRITE },
      { source: '/bluegenes',                          target: 'https://stage.alliancegenome.org/bluegenes/alliancemine',                             status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/bluegenes/',                         target: 'https://stage.alliancegenome.org/bluegenes/alliancemine',                             status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/bluegenes/<*>',                      target: 'https://stage-alliancemine.alliancegenome.org:444/bluegenes/<*>',                     status: amplify.RedirectStatus.REWRITE },
      { source: '/textpresso/sgd',                     target: 'https://stage.alliancegenome.org/textpresso/sgd/tpc',                                 status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/textpresso/sgd/',                    target: 'https://stage.alliancegenome.org/textpresso/sgd/tpc',                                 status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/textpresso/sgd/<*>',                 target: 'https://sgd-textpresso.alliancegenome.org/<*>',                                       status: amplify.RedirectStatus.REWRITE },
      { source: '/textpresso/wb',                      target: 'https://stage.alliancegenome.org/textpresso/wb/tpc',                                  status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/textpresso/wb/',                     target: 'https://stage.alliancegenome.org/textpresso/wb/tpc',                                  status: amplify.RedirectStatus.PERMANENT_REDIRECT },
      { source: '/textpresso/wb/<*>',                  target: 'https://wb-textpresso.alliancegenome.org/<*>',                                        status: amplify.RedirectStatus.REWRITE },
      { source: '/<*>',                                target: '/index.html',                                                                         status: amplify.RedirectStatus.NOT_FOUND_REWRITE },
      { source: '</^[^.]+$/>',                         target: '/index.html',                                                                         status: amplify.RedirectStatus.REWRITE }
    ];

    const amplifyApp = new amplify.App(this, 'agr-ui-stage', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'alliance-genome',
        repository: 'agr_ui',
        oauthToken: cdk.SecretValue.secretsManager('GithubOauthDevopsToken'),
      }),
      autoBranchCreation: {
        patterns: ['SCRUM-*'],
      },
      autoBranchDeletion: true,
      role: iam.Role.fromRoleArn(this, "AmplifyALBRole", 'arn:aws:iam::100225593120:role/StageAmplifyRole'),
    });

    const stage = amplifyApp.addBranch('stage', { autoBuild: true, branchName: 'stage', stage: 'PRODUCTION' });

    const domain = amplifyApp.addDomain('alliancegenome.org', {
      enableAutoSubdomain: true, // in case subdomains should be auto registered for branches
      autoSubdomainCreationPatterns: ['scrum-*'], // regex for branches that should auto register subdomains
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
