import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as cdk from 'aws-cdk-lib';

export class AmplifyRulesStack extends cdk.Stack {

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
      { source: '/<*>',                   target: '/index.html',                                                                         status: amplify.RedirectStatus.REWRITE },
      { source: '/api/<*>',               target: 'https://test-alb.alliancegenome.org/api/<*>',                                         status: amplify.RedirectStatus.REWRITE },
      { source: '/jbrowse/<*>',           target: 'https://test-alb.alliancegenome.org/jbrowse/<*>',                                     status: amplify.RedirectStatus.REWRITE },
      { source: '/apollo/<*>',            target: 'https://test-alb.alliancegenome.org/apollo/<*>',                                      status: amplify.RedirectStatus.REWRITE },
      { source: '/agr_simplemine.cgi',    target: 'https://caltech-curation.textpressolab.com/pub/cgi-bin/forms/agr_simplemine.cgi',     status: amplify.RedirectStatus.REWRITE },
      { source: '/alliancemine/cdn/<*>',  target: 'https://test-alb.alliancegenome.org/alliancemine/cdn/<*>',                            status: amplify.RedirectStatus.REWRITE },
      { source: '/alliancemine/',         target: 'https://test-alb.alliancegenome.org/alliancemine/',                                   status: amplify.RedirectStatus.REWRITE },
      { source: '/alliancemine/<*>',      target: 'https://test-alb.alliancegenome.org/alliancemine/<*>',                                status: amplify.RedirectStatus.REWRITE },
      { source: '/bluegenes',             target: 'https://test-alb.alliancegenome.org/bluegenes/alliancemine',                          status: amplify.RedirectStatus.REWRITE },
      { source: '/bluegenes/',            target: 'https://test-alb.alliancegenome.org/bluegenes/alliancemine',                          status: amplify.RedirectStatus.REWRITE },
      { source: '/bluegenes/',            target: 'https://test-alb.alliancegenome.org/bluegenes/<*>',                                   status: amplify.RedirectStatus.REWRITE },
      { source: '/swagger-ui',            target: 'https://test-alb.alliancegenome.org/swagger-ui',                                      status: amplify.RedirectStatus.REWRITE },
      { source: '/swagger-ui/',           target: 'https://test-alb.alliancegenome.org/swagger-ui/',                                     status: amplify.RedirectStatus.REWRITE },
      { source: '/swagger-ui/<*>',        target: 'https://test-alb.alliancegenome.org/swagger-ui/<*>',                                  status: amplify.RedirectStatus.REWRITE },
      { source: '/openapi',               target: 'https://test-alb.alliancegenome.org/openapi',                                         status: amplify.RedirectStatus.REWRITE },
      { source: '/openapi2',              target: 'https://test-alb.alliancegenome.org/openapi2',                                        status: amplify.RedirectStatus.REWRITE },
      { source: '</^[^.]+$|\.(?!(css|xml|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>', target: '/index.html',   status: amplify.RedirectStatus.NOT_FOUND_REWRITE }
    ];

    let amplifyApp = amplify.App.fromAppId(this, 'agr_ui_test', 'agr_ui_test');


    for(let path of test_paths) {
      amplifyApp.addCustomRule({
        source: path.source,
        target: path.target,
        status: path.status
      });
    }

  }
}
